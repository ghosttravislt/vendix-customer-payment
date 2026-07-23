"use client";

import { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Form from "next/form";
import styles from "./PaymentFlow.module.css";
import { confirmPayment } from "./action.js";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
/* ---------------------------------------------------------
   Shared bits
--------------------------------------------------------- */

function PhoneShell({ children }) {
  return <div className={styles.phone}>{children}</div>;
}

/* ---------------------------------------------------------
   Money illustration
   Swap the <svg> below for your own asset if you'd rather use
   a raster file, e.g. <img src="/money.png" alt="" className={styles.moneyIllustration} />
--------------------------------------------------------- */

function MoneyIllustration() {
  return (
    
    <svg
      viewBox="0 0 200 140"
      className={styles.moneyIllustration}
      aria-hidden="true"
    >
      {/* back bill */}
      <rect
        x="18"
        y="38"
        width="140"
        height="82"
        rx="10"
        fill="#EEECFC"
        stroke="#6D5EF0"
        strokeWidth="3"
        transform="rotate(-6 88 79)"
      />
      {/* middle bill */}
      <rect
        x="30"
        y="28"
        width="150"
        height="86"
        rx="10"
        fill="#F5F3FF"
        stroke="#4F3CC9"
        strokeWidth="3"
        transform="rotate(4 105 71)"
      />
      {/* front bill */}
      <rect
        x="20"
        y="30"
        width="150"
        height="86"
        rx="10"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="3.5"
      />
      <circle
        cx="95"
        cy="73"
        r="26"
        fill="#EEECFC"
        stroke="#4F3CC9"
        strokeWidth="3"
      />
      <text
        x="95"
        y="82"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#4F3CC9"
        fontFamily="sans-serif"
      >
        $
      </text>
      <path
        d="M32 44H50M32 52H44"
        stroke="#9B8CF4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M158 100H140M158 92H146"
        stroke="#9B8CF4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* coin */}
      <circle
        cx="160"
        cy="34"
        r="20"
        fill="#F5793B"
        stroke="#4F3CC9"
        strokeWidth="3"
      />
      <text
        x="160"
        y="41"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="sans-serif"
      >
        $
      </text>
      {/* sparkle */}
      <path
        d="M22 18l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z"
        fill="#7B6CF6"
      />
    </svg>
  );
}

/* ---------------------------------------------------------
   Screen 1 — Payment
--------------------------------------------------------- */

export function PaymentScreen({ onSuccess }) {

 const [state, formAction, isPending] = useActionState(confirmPayment, null);

  useEffect(()=>{
    if (!state) return;
  if(state?.success){
    onSuccess()
    toast.success("payment successfull")
  }
  else{
    toast.error("payment failed")
  }
},[state, onSuccess])

  return (<>
  <Toaster/>
    <PhoneShell>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Payment</h1>
      </div>

      {/* Money illustration */}
      <div className={styles.moneyWrap}>
        <MoneyIllustration />
      </div>
     <Form className={styles.form} action={formAction}>
        {/* Token */}
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Token</span>
          <input
            name="token"
            placeholder="Enter token"
            className={styles.input}
          />
        </label>

        {/* Amount paid */}
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Amount Paid</span>
          <div className={styles.amountRow}>
            <span className={styles.currencyPrefix}>$</span>
            <input
              name="amount_paid"
              placeholder="0.00"
              // inputMode="decimal"
              className={styles.amountInput}
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={isPending}
          className={`${styles.primaryButton} ${styles.payButton}`}
          
        >
          {isPending ? "Processing..." : "Pay Now"}
        </button>
      </Form>

      {/* Pay button */}
    </PhoneShell>
    </>
  );
}

/* ---------------------------------------------------------
   Screen 2 — Payment Success
--------------------------------------------------------- */

function SuccessCat() {
  return (
    <svg viewBox="0 0 220 200" className={styles.cat}>
      {/* soft circle backdrop */}
      <circle cx="110" cy="100" r="92" fill="#EEECFC" />

      {/* tail */}
      <path
        d="M60 150C30 150 18 118 34 96C46 80 68 84 70 100"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 96C40 88 54 86 62 92"
        fill="none"
        stroke="#4F3CC9"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="108" rx="10" ry="7" fill="#F5793B" />

      {/* ears */}
      <path
        d="M76 62L64 26C63 22 67 19 70 21L96 40Z"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M78 55L70 32L88 44Z" fill="#F5793B" />
      <path
        d="M144 62L156 26C157 22 153 19 150 21L124 40Z"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M142 55L150 32L132 44Z" fill="#7B6CF6" />

      {/* body */}
      <ellipse
        cx="110"
        cy="150"
        rx="46"
        ry="24"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
      />

      {/* head */}
      <circle
        cx="110"
        cy="90"
        r="52"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
      />

      {/* orange patch */}
      <path d="M80 52C88 42 104 40 112 48C104 58 90 60 80 52Z" fill="#F5793B" />

      {/* blush */}
      <ellipse cx="76" cy="102" rx="10" ry="6" fill="#FBC7C7" opacity="0.9" />
      <ellipse cx="144" cy="102" rx="10" ry="6" fill="#FBC7C7" opacity="0.9" />

      {/* eyes */}
      <g>
        <ellipse cx="90" cy="90" rx="8" ry="10" fill="#241F5D" />
        <circle cx="93" cy="86" r="2.4" fill="#FFFFFF" />
        <ellipse cx="130" cy="90" rx="8" ry="10" fill="#241F5D" />
        <circle cx="133" cy="86" r="2.4" fill="#FFFFFF" />
      </g>

      {/* nose + mouth */}
      <path
        d="M106 104C108 107 112 107 114 104"
        stroke="#4F3CC9"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="110" cy="100" r="2.5" fill="#4F3CC9" />

      {/* whiskers */}
      <path
        d="M56 92H72M56 100H72"
        stroke="#4F3CC9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M148 92H164M148 100H164"
        stroke="#4F3CC9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* front paws */}
      <ellipse
        cx="94"
        cy="168"
        rx="9"
        ry="12"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
      />
      <path
        d="M130 172C124 158 130 138 146 132C158 128 166 138 162 148C158 158 142 158 138 148"
        fill="#FFFFFF"
        stroke="#4F3CC9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* heart */}
      <path
        d="M168 118c-7-7-18-3-18 6 0 8 12 16 18 20 6-4 18-12 18-20 0-9-11-13-18-6z"
        fill="#4F3CC9"
      />
    </svg>
  );
}

export function PaymentSuccessScreen( { onHome  }) {
  return (
    <PhoneShell>
      <div className={styles.successTop}>
        <SuccessCat />
        <h2 className={styles.successTitle}>Payment Success</h2>
        <p className={styles.successText}>
          Pull up a chair, sit back, and relax as your order is on its way to
          you!
        </p>
      </div>

      <div className={styles.successActions}>
        <button
          type="button"
          onClick={onHome}
          className={styles.secondaryButton}
        >
          Back to Home
        </button>
      </div>
    </PhoneShell>
  );
}

/* ---------------------------------------------------------
   Demo wrapper — swaps between the two screens
--------------------------------------------------------- */

export default function PaymentFlowDemo() {
    const [step, setStep] = useState("payment");

  return (
    <div className={styles.page}>
      {step === "payment" ? (
        <PaymentScreen onSuccess={() => setStep("success")} />
      ) : (
        <PaymentSuccessScreen onHome={() => setStep("payment")} />
      )}
    </div>
  );
}
