import React from 'react';
import { Reveal } from './Reveal';

export const SectionHead = ({ title, lead }) => (
  <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
    <h2 className="h2">{title}</h2>
    {lead && <p className="lede mt-4">{lead}</p>}
  </Reveal>
);
