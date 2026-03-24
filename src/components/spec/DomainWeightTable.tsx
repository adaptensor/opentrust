import { DOMAINS } from '@/data/otp-spec';

export default function DomainWeightTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-3/50">
            <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Domain</th>
            <th className="text-right py-3 px-4 font-display font-bold text-text-primary">Weight</th>
            <th className="text-right py-3 px-4 font-display font-bold text-text-primary">Controls</th>
          </tr>
        </thead>
        <tbody>
          {DOMAINS.map((domain) => (
            <tr key={domain.number} className="border-b border-surface-3/20 hover:bg-surface-1/50 transition-colors">
              <td className="py-3 px-4">
                <span className="text-brand-gold font-display font-bold mr-2">{domain.number}.</span>
                <span className="text-text-primary">{domain.name}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-gold"
                      style={{ width: `${domain.weight * 100 * (100 / 15)}%` }}
                    />
                  </div>
                  <span className="text-text-secondary font-mono text-xs w-8 text-right">
                    {(domain.weight * 100).toFixed(0)}%
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-right text-text-secondary">
                {domain.controlCount}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-surface-3/50">
            <td className="py-3 px-4 font-display font-bold text-text-primary">Total</td>
            <td className="py-3 px-4 text-right font-display font-bold text-brand-gold">100%</td>
            <td className="py-3 px-4 text-right font-display font-bold text-text-primary">
              {DOMAINS.reduce((sum, d) => sum + d.controlCount, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
