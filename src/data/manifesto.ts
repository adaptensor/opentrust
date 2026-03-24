// Open Trust Manifesto — Section 7 of OTP v1.0

export interface ManifestoStatement {
  id: number;
  text: string;
}

export const MANIFESTO_STATEMENTS: ManifestoStatement[] = [
  {
    id: 1,
    text: 'That security transparency is a right, not a privilege. Every customer of every software platform deserves to know how their data is protected — not because an auditor said so behind an NDA, but because they can read the evidence themselves.',
  },
  {
    id: 2,
    text: 'That the cost of proving trustworthiness should not be a barrier to being trustworthy. A $50,000 audit fee does not make software more secure. It makes security certification a luxury that only well-funded companies can afford, leaving everyone else\'s customers in the dark.',
  },
  {
    id: 3,
    text: 'That delegating security-critical functions to certified specialists is not a weakness — it is the strongest possible engineering decision. We do not pretend to be better at authentication than companies that do nothing but authentication. We do not pretend to be better at payment security than companies that do nothing but payment security. We choose the best tools and publish the evidence.',
  },
  {
    id: 4,
    text: 'That a low score honestly reported builds more trust than a high score hidden behind an NDA. Perfection is not the standard. Transparency is the standard. Every gap disclosed is a promise to fix it. Every gap hidden is a liability waiting to detonate.',
  },
  {
    id: 5,
    text: 'That small businesses deserve the same security protections as Fortune 500 companies. The Open Trust Protocol exists so that any software company — regardless of size, funding, or ability to pay audit fees — can prove its security posture to its customers in a way that is readable, verifiable, and free.',
  },
];

export const MANIFESTO_CLOSING = 'This standard is public. It belongs to everyone who adopts it. Use it. Publish against it. Extend it. Challenge it. Make it better.';
