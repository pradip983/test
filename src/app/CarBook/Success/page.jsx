import { Suspense } from "react";
import SuccessCar from "@/components/SuccessCar"; // ✅ Ensure this is a Client Component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessCar />
    </Suspense>
  );
}