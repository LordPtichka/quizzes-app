import BtnUpdate from "@/component/btn/BtnUpdate";
import CardWrap from "@/component/cardWrap/CardWrap";
import Form from "@/component/form/Form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CardWrap />
        </div>

        <Form />
      </main>
    </div>
  );
}
