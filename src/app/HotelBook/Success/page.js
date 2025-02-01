import { Suspense } from "react";
import SuccessHotel from "@/components/SuccessHotel";// ✅ Ensure this is a Client Component

export default function Page() {
  return (
    <Suspense>
      <SuccessHotel />
    </Suspense>
  );
}