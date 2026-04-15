/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse items-center", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
          style={{ zIndex: 10 + index }}
        >
          <img
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-[10px] font-bold text-white"
          style={{ zIndex: 10 + avatarUrls.length }}
        >
          +99
        </div>
      )}
    </div>
  );
};
