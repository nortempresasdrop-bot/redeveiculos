'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuditLog {
  id: string;
  action: string;
  target_type: string;
  created_at: string;
}

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      setLogs(data || []);
      setLoading(false);
    }

    fetchLogs();
  }, []);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Auditoria</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Ação</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4">{log.target_type}</td>
                <td className="px-6 py-4">
                  {new Date(log.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
