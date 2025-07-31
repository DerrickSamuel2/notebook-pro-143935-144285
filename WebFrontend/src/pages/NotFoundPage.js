import React from "react";
import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404 - Not Found</h1>
      <p>This page does not exist. <Link to="/">Go Home</Link></p>
    </div>
  );
}
