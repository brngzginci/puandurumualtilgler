import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught React Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#03090C] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-[#061820] border border-cyan-900/60 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black font-montserrat uppercase tracking-wider text-white">
              Bir Yükleme Hatası Oluştu
            </h2>
            <p className="text-sm text-slate-400">
              Sayfa yüklenirken geçici bir render hatası tespit edildi. Aşağıdaki butona tıklayarak sayfayı yenileyebilirsiniz.
            </p>
            {this.state.error?.message && (
              <div className="w-full bg-[#03090C] border border-zinc-800 rounded-xl p-3 text-xs font-mono text-slate-400 text-left overflow-auto max-h-32">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00AFAF] to-[#FF6500] text-black font-black uppercase text-xs tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
