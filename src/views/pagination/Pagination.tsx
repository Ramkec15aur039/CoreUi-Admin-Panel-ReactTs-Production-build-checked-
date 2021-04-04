import React from "react";
import "./Pagination.css";

export default function Pagination(props: any) {
  const pageLinks: any = [];
  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage === i ? "active" : "";
    pageLinks.push(
      <li
        className={`pagination ${active}`}
        onClick={() => props.nextPage(i)}
      >
        <a href="">{i}</a>
      </li>
    );
  }

  return (
    <div className="container">
      <div className="text-center">
        <ul>{pageLinks}</ul>
      </div>
    </div>
  );
}
