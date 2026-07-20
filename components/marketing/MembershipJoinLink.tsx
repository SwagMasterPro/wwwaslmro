"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { getMembershipJoinUrl, trackMembershipEvent } from "@/lib/analytics";

type MembershipJoinLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  source: string;
  children: ReactNode;
};

export default function MembershipJoinLink({ source, children, onClick, ...props }: MembershipJoinLinkProps) {
  return (
    <a
      {...props}
      href={getMembershipJoinUrl(source)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackMembershipEvent("begin_membership", { source });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
