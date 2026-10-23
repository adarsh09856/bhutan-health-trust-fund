import React from "react";
import { ArrowDown, CornerRightUp } from "lucide-react";

interface DonationFlowchartProps {
  variant: "domestic" | "international";
  isDzongkha?: boolean;
}

export function DonationFlowchart({ variant, isDzongkha = false }: DonationFlowchartProps) {
  const isDomestic = variant === "domestic";

  return (
    <div className="w-full bg-[#FAF9F5] border border-slate-300 rounded-2xl overflow-hidden shadow-xs">
      {/* Top Forest Green Header Banner */}
      <div className="bg-[#1C5144] text-white py-3 px-4 sm:px-6 text-center font-sans font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <span>
          {isDomestic
            ? isDzongkha
              ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ལུ་ ཞལ་འདེབས་ཕུལ་ཐངས།"
              : "How to make a donation to BHTF"
            : isDzongkha
              ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ལུ་ ཞལ་འདེབས་ཕུལ་ཐངས: རྒྱལ་སྤྱིའི་ཞལ་འདེབས་པ།"
              : "How to make a donation to BHTF: international donors"}
        </span>
      </div>

      {/* Main Flowchart Body */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* =========================================
              PART 1: DONATION FORM
          ========================================= */}
          <div className="flex flex-col space-y-2.5">
            <div className="text-[11px] font-mono font-black text-slate-800 uppercase tracking-wider text-center md:text-left mb-1">
              {isDzongkha ? "ཡན་ལག་ ༡ • ཞལ་འདེབས་འགེངས་ཤོག" : "PART 1 DONATION FORM"}
            </div>

            {/* Step 1: Website home page */}
            <div className="bg-[#F8F5EE] border border-slate-400/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "BHTF གཞུང་འབྲེལ་ཡོངས་འབྲེལ་གདོང་ཤོག" : "BHTF website home page"}
              </div>
            </div>

            <div className="flex justify-center text-slate-500 py-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step 2: Click Make donation */}
            <div className="bg-[#D9EFE5] border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "“ཞལ་འདེབས་ཕུལ” ཨེབ།" : "Click Make donation"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                {isDzongkha ? "གདོང་ཤོག་མགོ་གི་ གདམ་ཐོ།" : "Top navigation menu"}
              </div>
            </div>

            <div className="flex justify-center text-slate-500 py-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step 3: Choose donor type */}
            <div className="bg-[#D9EFE5] border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "ཞལ་འདེབས་པའི་དབྱེ་བ་གདམ།" : "Choose donor type"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                {isDomestic
                  ? isDzongkha
                    ? "རྒྱལ་ནང་ ཡང་ན་ རྒྱལ་སྤྱི།"
                    : "National or International"
                  : isDzongkha
                    ? "རྒྱལ་སྤྱི་གདམ།"
                    : "Select International"}
              </div>
            </div>

            <div className="flex justify-center text-slate-500 py-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step 4: Enter donation amount */}
            <div className="bg-[#D9EFE5] border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "ཞལ་འདེབས་བསྡོམས་འབོར་བཙུགས།" : "Enter donation amount"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                {isDomestic
                  ? isDzongkha
                    ? "དངུལ་ཀྲམ་ (Nu.) ནང་།"
                    : "Amount in Nu."
                  : isDzongkha
                    ? "ཁྱོད་ཀྱིས་ཕུལ་དགོ་མནོ་མི་ བསྡོམས་འབོར།"
                    : "Amount you wish to give"}
              </div>
            </div>

            <div className="flex justify-center text-slate-500 py-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step 5: Enter your information */}
            <div className="bg-[#D9EFE5] border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "ཁྱོད་རའི་ གནས་ཚུལ་བཙུགས།" : "Enter your information"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                {isDomestic
                  ? isDzongkha
                    ? "མིང་ གློག་འཕྲིན་ བརྒྱུད་འཕྲིན་ འཕྲིན་ཡིག"
                    : "Name, email, phone, message"
                  : isDzongkha
                    ? "མིང་ གློག་འཕྲིན་ རྒྱལ་ཁབ་ བརྒྱུད་འཕྲིན།"
                    : "Name, email, country, phone"}
              </div>
            </div>

            <div className="flex justify-center text-slate-500 py-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step 6: Click Pay now */}
            <div className="bg-[#D9EFE5] border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-2xs">
              <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                {isDzongkha ? "“ད་ལྟོ་དངུལ་སྤྲོད” ཨེབ།" : "Click Pay now"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                {isDzongkha ? "དངུལ་སྤྲོད་སྒོ་ཕྱེ།" : "Payment window opens"}
              </div>
            </div>
          </div>

          {/* =========================================
              PART 2: PAYMENT OR CARD PAYMENT
          ========================================= */}
          <div className="flex flex-col space-y-2.5">
            <div className="text-[11px] font-mono font-black text-slate-800 uppercase tracking-wider text-center md:text-left mb-1">
              {isDomestic
                ? isDzongkha
                  ? "ཡན་ལག་ ༢ • དངུལ་སྤྲོད།"
                  : "PART 2 PAYMENT"
                : isDzongkha
                  ? "ཡན་ལག་ ༢ • བྱང་བུའི་དངུལ་སྤྲོད།"
                  : "PART 2 CARD PAYMENT"}
            </div>

            {isDomestic ? (
              /* --- DOMESTIC PART 2 --- */
              <>
                {/* Step 1: Complete your payment */}
                <div className="bg-[#E4ECF8] border border-blue-400/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "དངུལ་སྤྲོད་མཇུག་བསྡུ།" : "Complete your payment"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "ཁུངས་གཏུགས་ཨང་ སྟོན་ཡོད།" : "Reference number is shown"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 2: Select your bank */}
                <div className="bg-[#E4ECF8] border border-blue-400/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "ཁྱོད་རའི་ དངུལ་ཁང་གདམ།" : "Select your bank"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "དངུལ་ཁང་ཐོ་ནང་ལས་ གདམ་ཁ་རྐྱབས།" : "Choose from the bank list"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 3: Enter account number */}
                <div className="bg-[#E4ECF8] border border-blue-400/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "རྩིས་ཁྲ་ཨང་ བཙུགས།" : "Enter account number"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "ཁྱོད་རའི་ དངུལ་ཁང་གི་ རྩིས་ཁྲ་ཨང་།" : "Your bank account number"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 4: Verify account, send OTP */}
                <div className="bg-[#E4ECF8] border border-blue-400/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "རྩིས་ཁྲ་བདེན་དཔྱད་དང་ OTP གཏང་།" : "Verify account, send OTP"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "ཆ་མེད་བཏང་པ་ཅིན་ སྒོ་བསྡམས།" : "Cancel closes the window"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 5: Enter OTP (DASHED BOX) */}
                <div className="bg-[#E4ECF8] border-2 border-dashed border-slate-700 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "OTP བཙུགས།" : "Enter OTP"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "དངུལ་ཁང་གིས་བཏང་མི་ གསང་ཨང་།" : "One-time password from bank"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 6: Donation confirmed (LIGHT GREEN BOX) */}
                <div className="bg-[#E3EED7] border-2 border-emerald-600/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-black text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "ཞལ་འདེབས་ངེས་གཏན་བྱུང་ཡི།" : "Donation confirmed"}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-0.5 font-medium">
                    {isDzongkha ? "བྱུང་འཛིན་དང་ བཀྲིན་དགའ་ཚོར་འཕྲིན་ཡིག" : "Receipt and thank-you message"}
                  </div>
                </div>
              </>
            ) : (
              /* --- INTERNATIONAL PART 2 --- */
              <>
                {/* Step 1: Card payment window opens */}
                <div className="bg-[#E4ECF8] border border-blue-400/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "བྱང་བུའི་དངུལ་སྤྲོད་སྒོ་ཕྱེ།" : "Card payment window opens"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "འབྲུག་དངུལ་ཁང་གི་ ཉེན་སྲུང་དངུལ་སྤྲོད།" : "Bank of Bhutan secure payment"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 2: Click Open payment window (Peach / Amber) */}
                <div className="bg-[#FBE6C7] border border-amber-500/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "“དངུལ་སྤྲོད་སྒོ་ཕྱེ” ཨེབ།" : "Click Open payment window"}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-0.5 font-light">
                    {isDzongkha ? "ཡོངས་འབྲེལ་བཀག་པ་ཅིན་རྐྱངམ་གཅིག" : "Only if browser blocks popup"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 3: Enter card details (DASHED BOX) */}
                <div className="bg-[#E4ECF8] border-2 border-dashed border-slate-700 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "བྱང་བུའི་ཁ་གསལ་བཙུགས།" : "Enter card details"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "འབྲུག་དངུལ་ཁང་གི་ ཤོག་ལེབ་གུར།" : "On the Bank of Bhutan page"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 4: Authenticate card payment (DASHED BOX) */}
                <div className="bg-[#E4ECF8] border-2 border-dashed border-slate-700 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "བྱང་བུའི་དངུལ་སྤྲོད་བདེན་དཔྱད།" : "Authenticate card payment"}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-light">
                    {isDzongkha ? "དངུལ་ཁང་བདེན་དཔྱད་རིམ་པ།" : "Bank verification step"}
                  </div>
                </div>

                <div className="flex justify-center text-slate-500 py-0.5">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* Step 5: Donation confirmed (LIGHT GREEN BOX) */}
                <div className="bg-[#E3EED7] border-2 border-emerald-600/80 rounded-xl p-2.5 text-center shadow-2xs">
                  <div className="font-black text-slate-900 text-xs sm:text-[13px]">
                    {isDzongkha ? "ཞལ་འདེབས་ངེས་གཏན་བྱུང་ཡི།" : "Donation confirmed"}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-0.5 font-medium">
                    {isDzongkha ? "བྱུང་འཛིན་དང་ བཀྲིན་དགའ་ཚོར་འཕྲིན་ཡིག" : "Receipt and thank-you message"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Legend & Instructions Footer */}
        <div className="pt-3 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-xs border-2 border-dashed border-slate-700 bg-[#E4ECF8] inline-block shrink-0" />
            <span className="font-medium">
              {isDzongkha
                ? "ཚིགས་ཐིག་ཅན་གྱི་སྒྲོམ་ = BHTF དང་གཅིག་ཁར་ ངེས་གཏན་བཟོ་ནིའི་རིམ་པ།"
                : "Dashed box = step to confirm with BHTF"}
            </span>
          </div>

          {!isDomestic && (
            <div className="text-slate-500 text-[10.5px] italic text-center sm:text-right">
              {isDzongkha
                ? "དངུལ་མ་སྤྲོད་ཚུན་ ཞལ་འདེབས་ཤོག་ལེབ་སྒོ་ཕྱེ་སྟེ་བཞག་གནང་།"
                : "Keep the donation page open while paying. Cancel payment is available in the popup."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
