import React from "react";
import "./Pagination.css";

export default function Pagination(props: any) {
  console.log("From pagination:",props.currentPage);
  const pageLinks: any = [];
  for (let i = 1; i <= props.pages; i++) {
    let active = props.currentPage === i ? "active" : "";
    pageLinks.push(
      <li key={i} className={`pagination ${active}`} onClick={() => props.nextPage(i)}>
        <span>{i}</span>
      </li>
    );
  }

  return (
    <div className="container">
      <div className="text-center">
        <ul>
          {props.currentPage > 1 ? (
            <li
              className={`pagination`}
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <span className="customSpan">&laquo;</span>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages ? (
            <li
              className={`pagination`}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <span className="customSpan">&raquo;</span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
