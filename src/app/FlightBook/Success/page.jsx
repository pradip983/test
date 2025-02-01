import { Suspense } from "react";
import SuccessFlight from "@/components/SuccessFlight";// ✅ Ensure this is a Client Component

export default function Page() {
  return (
    <Suspense>
      <SuccessFlight />
    </Suspense>
  );
}