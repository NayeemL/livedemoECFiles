import React from "react";
import "./tableView.css";

export default function DetailsLeft({terms, otherTerms}) {
  return (
    <div className="mt-6 mb-14 text-left bg-white">
      <div className="terms-style">
        <h3 className="font-bold text-base text-left bg-slate-200 px-2 p-1">
          Terms and Condition:
        </h3>
        <p className="mt-2 px-1 break-words">
          {terms}
        </p>
      </div>
      <div>
        <h3 className="font-bold text-base text-left bg-slate-200 px-2 p-1">
          Other Terms:
        </h3>
        <p className="mt-2 px-1">{otherTerms}</p>
      </div>
    </div>
  );
}
