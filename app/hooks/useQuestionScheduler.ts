// app/hooks/useQuestionScheduler.ts
import { useEffect, useState, useCallback } from "react";
import { fetchQuestion } from "@/app/lib/fetch-data";
import type { Question } from "@/app/lib/types";

function rollInterval() {
  // random integer in [3..7]
  return Math.floor(Math.random() * 5) + 3;
}

export function useQuestionScheduler(
  storySlug: string,
  currentOrder: number
): {
  question: Question | null;
  initialized: boolean;
  onSuccess: () => void;
} {
  const baseKey = `askChapter_${storySlug}_base`;
  const nextKey = `askChapter_${storySlug}_next`;

  const [question, setQuestion] = useState<Question | null>(null);
  const [initialized, setInitialized] = useState(false);



  useEffect(() => {
    // Read both stored values just once
    const rawBase = localStorage.getItem(baseKey);
    const rawNext = localStorage.getItem(nextKey);
    let base = rawBase ? Number(rawBase) : NaN;
    let next = rawNext ? Number(rawNext) : NaN;

    const needReset =
      isNaN(base) ||
      currentOrder < base ||
      (!isNaN(next) && currentOrder > next);

    if (needReset) {
      base = currentOrder;
      next = base + rollInterval();
      localStorage.setItem(baseKey, String(base));
      localStorage.setItem(nextKey, String(next));
    }

    if (currentOrder === next) {
      fetchQuestion()
        .then((res) => setQuestion(res.data))
        .catch(() => setQuestion(null))
        .finally(() => setInitialized(true));
    } else {
      setQuestion(null);
      setInitialized(true);
    }
  }, [storySlug, currentOrder, baseKey, nextKey]);

  // onSuccess should only re-schedule, never read again
  const onSuccess = useCallback(() => {
    const base = currentOrder;
    const next = base + rollInterval();
    localStorage.setItem(baseKey, String(base));
    localStorage.setItem(nextKey, String(next));
    setQuestion(null);
  }, [currentOrder, baseKey, nextKey]);

  return { question, initialized, onSuccess };
}
