"use client"
import React from "react"

const ModernSpinner = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {/* Texte */}
      <h2 className="text-xl font-medium text-gray-800">{title}</h2>

      {/* Loader SVG style Google */}
      <svg
        className="h-12 w-12 animate-spin-slow text-blue-600"
        viewBox="25 25 50 50"
      >
        <circle
          className="stroke-current"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="89, 200"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  )
}

export default ModernSpinner
