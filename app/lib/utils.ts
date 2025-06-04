import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FilterOptions } from "./types";
import * as _ from "lodash";
import { Dayjs, isDayjs } from "dayjs";
import { isMoment, Moment } from "moment";

const FORMAT_DATE = "YYYY-MM-DDTHH:mm:ssZ";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRating(rating: number): string {
  return (rating ?? 0).toFixed(1);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function timeAgo(date: string): string {
  return date; // In a real app, implement proper time formatting
}

export const formatDate = (date: string): string => {
  return new Date(date || "").toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (date: string): string => {
  return new Date(date || "").toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const createFilter = (
  params: Record<string, unknown>,
  operators?: Map<string, string>
): string => {
  return Object.keys(params)
    .filter(
      (k: string): boolean =>
        (!isEmpty(params[k] as string | number) &&
          !_.has(params[k], "from") &&
          !_.has(params[k], "to")) ||
        (_.has(params[k], "from") &&
          _.has(params[k], "to") &&
          !_.isNil(params[k].from) &&
          !_.isNil(params[k].to))
    )
    .map((k: string): string => {
      if (operators?.get(k) === "ct" || operators?.get(k) === "in") {
        return (
          k +
          `|${operators?.get(k)}|` +
          (Array.isArray(params[k]) ? (params[k] as unknown[]).join() : "")
        );
      } else if (_.has(params[k], "from") && _.has(params[k], "to")) {
        type RangeType = {
          from: Moment | Dayjs | string | number;
          to: Moment | Dayjs | string | number;
        };
        const range = params[k] as RangeType;
        if (isDate(range.from) && isDate(range.to)) {
          return (
            k +
            `|${operators?.get("from")}|` +
            (range.from as Moment | Dayjs).format(FORMAT_DATE) +
            "&" +
            k +
            `|${operators?.get("to")}|` +
            (range.to as Moment | Dayjs).format(FORMAT_DATE)
          );
        }
        return (
          k +
          `|${operators?.get("from")}|` +
          (params[k].from as string | number).toString() +
          "&" +
          k +
          `|${operators?.get("to")}|` +
          (params[k].to as string | number).toString()
        );
      } else {
        return (
          k +
          `|${operators?.get(k)}|` +
          (params[k] as string | number).toString().trim()
        );
      }
    })
    .join("&");
}

export const isDate = (date: unknown): date is Moment | Dayjs => {
  return isMoment(date) || isDayjs(date);
}

export const isEmpty = (value: number | string): boolean => {
  return (
    value === null || value === undefined || value.toString().trim() === ""
  );
};

export const parseFilterString = (
  filterStr: string
): Partial<FilterOptions> => {
  const result: Partial<FilterOptions> = {};
  const segments = filterStr.split("&");

  for (const segment of segments) {
    const [key, operator, value] = segment.split("|");

    if (!key || !value) continue;

    if (operator === "in") {
      result[key as keyof FilterOptions] = value.split(",");
    } else {
      result[key as keyof FilterOptions] = value;
    }
  }

  return result;
};

export type converterFunc = (
  fieldValue?: string,
  argument?: string
) => string | boolean | Array<string> | Array<number> | moment.Moment;

export const decodeParam = (param: string, converters: Map<string, converterFunc>): Record<string, unknown> => {
  return param.split('&').reduce((acc: Record<string, unknown>, cur: string, curIndex: number, arr: Array<string>): Record<string, unknown> => {
    const [curKey, , curValue]: Array<string> = cur.split('|');
    const listValue: Array<string> = [curValue];

    if (_.isEmpty(curKey)) {
      return acc;
    }

    if (curIndex > 0) {
      const [lastKey, lastOperator, lastValue]: Array<string> = arr[curIndex - 1].split('|');
      if (lastKey === curKey) {
        if (lastOperator === 'gte') {
          listValue.unshift(lastValue);
        } else {
          listValue.push(lastValue);
        }
      }
    }
    const converter = converters.get(curKey);
    if (converter) {
      acc[curKey] = converter(...listValue);
    }
    return acc;
  }, {});
}

export const isBoolean = (value: string): boolean => {
  return value === 'true' || value === 'false';
}


export function normalizeFilterPayload(
  opts: Record<string, unknown>,
  operators: Map<string, string>
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  // 1. Tạo map từ baseKey → fullKey (vd: "categories" → "categories.slug")
  const baseToFull: Record<string, string> = {};
  for (const fullKey of operators.keys()) {
    const idx = fullKey.indexOf(".");
    if (idx > 0) {
      const base = fullKey.slice(0, idx);
      // nếu cùng base có nhiều fullKey, có thể ưu tiên hoặc ghi đè sau; 
      // ở đây giả sử chỉ có 1 mapping per base
      baseToFull[base] = fullKey;
    }
  }

  // 2. Quét qua mỗi entry trong opts
  for (const [key, value] of Object.entries(opts)) {
    // bỏ null/undefined
    if (value == null) continue;
    // bỏ array rỗng
    if (Array.isArray(value) && value.length === 0) continue;

    // nếu key tồn tại trong baseToFull (nghĩa là có operator "key.xxx")
    if (baseToFull[key] !== undefined) {
      const fullKey = baseToFull[key]; // ví dụ "categories.slug" hoặc "hashtags.name"
      payload[fullKey] = value;
    } else {
      // key bình thường (không phải array cần map), giữ nguyên
      payload[key] = value;
    }
  }

  return payload;
}

export const capitalizeFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1)
}
