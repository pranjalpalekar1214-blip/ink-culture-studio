"use client";

import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: LinkProps["href"] }>;

export function Link({ to, children, ...props }: Props) {
  return <NextLink href={to} {...props}>{children}</NextLink>;
}
