import moment from 'moment';

export interface IDateRange {
  from: moment.Moment;
  to: moment.Moment;
}

export function stringConverter(fieldValue: string): string {
  return fieldValue;
}

export function booleanConverter(fieldValue: string): boolean {
  return fieldValue === 'true';
}

export function arrayConverter(fieldValue: string): Array<string> {
  return fieldValue.split(',');
}

export function numberArrayConverter(fieldValue: string): Array<number> {
  return fieldValue.split(',').map((id: string): number => Number(id));
}

export function numberConverter(fieldValue: string): number {
  return Number(fieldValue);
}

export function dateConverter(fieldValue: string): moment.Moment {
  return moment(fieldValue, 'YYYY-MM-DDTHH:mm:ssZ');
}

export function dateRangeConverter(from: string, to: string): IDateRange {
  return {
    from: moment(from, 'YYYY-MM-DDTHH:mm:ssZ'),
    to: moment(to, 'YYYY-MM-DDTHH:mm:ssZ'),
  };
}
