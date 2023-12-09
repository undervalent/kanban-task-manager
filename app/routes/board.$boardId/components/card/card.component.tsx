import React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./card.styles.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Card() {
  return (
    <article className="card">
      <h3 className="card__title">Card</h3>
      <p className="card__description">card sub</p>
    </article>
  );
}
