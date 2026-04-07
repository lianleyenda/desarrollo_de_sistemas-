import { useState } from "react";

export type Item = {
  id: string;
  name: string;
  done: boolean;
};

export function useListaDeCompras() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");

  const agregarItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmed, done: false },
    ]);

    setText("");
  };

  const marcarItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, done: !it.done } : it
      )
    );
  };

  const removerItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    text,
    setText,
    agregarItem,
    marcarItem,
    removerItem,
  };
}