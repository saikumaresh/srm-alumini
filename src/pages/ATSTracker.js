import React from "react";

function ATSTracker() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Smart ATS: Resume Optimization Tool
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enhance your resume for ATS compatibility. Boost your chances of getting selected by matching your resume with the job description.
        </p>
        <div className="flex justify-center">
          <iframe
            src="https://nikhilsinghxlx-smart-ats-resume-optimizer.hf.space/?embed=true&embed_options=show_toolbar"
            title="ATS Tracker"
            className="w-full h-[600px] rounded-lg border-none"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ATSTracker;
