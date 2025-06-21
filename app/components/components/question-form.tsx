"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { httpClient } from "@/app/utils/httpClient";
import { Question } from "@/app/lib/types";

interface QuestionProps {
  question: Question | null;
  onSuccess?: () => void;
}

export default function QuestionForm({ question, onSuccess }: QuestionProps) {
  const form = useForm<{ answer: string }>({ defaultValues: { answer: "" } });
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const onSubmit = async (values: { answer: string }) => {
    setLoading(true);
    setServerError("");
    try {
      const result = await httpClient.post({
        url: "/api/story/question/validate",
        data: { id: question?.id, answer: values.answer },
      });
      setLoading(false);

      if (result.data) {
        // answer is correct!
        onSuccess?.();
      } else {
        setServerError("Câu trả lời của bạn chưa chính xác!");
      }
    } catch (err: unknown) {
      setLoading(false);
      setServerError(
        err instanceof Error
          ? err.message || "Có lỗi xảy ra, vui lòng thử lại."
          : "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  return (
    <div className="max-w-xl w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border mx-auto space-y-6">
      <h3 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
        Xác minh tôi không phải là Robot
      </h3>
      <p className="text-red-500 pb-2 text-base italic">
        Vui lòng trả lời câu hỏi để tiếp tục xem nội dung chương!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="answer"
            rules={{ required: "Vui lòng nhập câu trả lời của bạn." }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-lg font-medium text-white">
                  {question?.question}
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 w-full px-4 py-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white"
                    placeholder="Nhập câu trả lời..."
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {serverError && (
            <p className="text-center text-red-600">{serverError}</p>
          )}
          <Button
            type="submit"
            className="w-full py-3 text-base font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex justify-center items-center hover:scale-105 transition-all duration-200 focus:scale-90"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-6 w-6 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Đang kiểm tra...
              </>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
