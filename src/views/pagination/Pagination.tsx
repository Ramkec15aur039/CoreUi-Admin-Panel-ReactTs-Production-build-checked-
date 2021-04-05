import React from "react";
import "./Pagination.css";

export default function Pagination(props: any) {
  const pageLinks: any = [];
  for (let i = 1; i <= props.pages + 1; i++) {
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
              <span>&laquo;</span>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages + 1 ? (
            <li
              className={`pagination`}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <span>&raquo;</span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
