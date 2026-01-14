import React from 'react';

interface Props {
  params: { slug: string };
}

export default function ResortPage({ params }: Props) {
  const { slug } = params; // ✅ works in server component

  return <div>Resort: {slug}</div>;
}
