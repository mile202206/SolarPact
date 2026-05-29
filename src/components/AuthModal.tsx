import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Loader2, UserCircle, Megaphone, HandHelping } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthModal = () => {
  const { user, isAuthenticated, isConnecting, showAuthModal, setShowAuthModal, connectWallet, setRole, disconnect } = useAuth();
  const { t } = useLanguage();

  if (!showAuthModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={() => setShowAuthModal(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md glass-card p-8 glow-primary"
        >
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isAuthenticated ? (
            /* Connect Wallet Step */
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">{t("connectWallet")}</h2>
              <p className="text-muted-foreground text-sm mb-8">
                {t("loginRequiredDesc")}
              </p>
              
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-amber-400 text-primary-foreground font-display font-semibold text-lg glow-primary hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    连接中...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    MetaMask / WalletConnect
                  </>
                )}
              </button>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex-1 py-3 rounded-xl glass-card text-sm font-medium hover:bg-card/80 transition-colors flex items-center justify-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  Demo 模式
                </button>
              </div>
            </div>
          ) : !user?.role ? (
            /* Role Selection Step */
            <div>
              <h2 className="font-display text-2xl font-bold mb-2 text-center">{t("selectRole")}</h2>
              <p className="text-muted-foreground text-sm mb-6 text-center">
                {user?.displayAddress}
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => { setRole("publisher"); setShowAuthModal(false); }}
                  className="w-full p-5 rounded-xl glass-card hover:border-primary/50 transition-all group text-left flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:glow-primary transition-shadow">
                    <Megaphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                      {t("rolePublisher")}
                    </h3>
                    <p className="text-muted-foreground text-sm">{t("rolePublisherDesc")}</p>
                  </div>
                </button>
                
                <button
                  onClick={() => { setRole("partner"); setShowAuthModal(false); }}
                  className="w-full p-5 rounded-xl glass-card hover:border-secondary/50 transition-all group text-left flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:glow-secondary transition-shadow">
                    <HandHelping className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg group-hover:text-secondary transition-colors">
                      {t("rolePartner")}
                    </h3>
                    <p className="text-muted-foreground text-sm">{t("rolePartnerDesc")}</p>
                  </div>
                </button>
              </div>

              <button
                onClick={() => { disconnect(); }}
                className="mt-4 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("disconnect")}
              </button>
            </div>
          ) : (
            /* Connected — Profile */
            <div className="text-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-primary/30"
              />
              <h2 className="font-display text-xl font-bold mb-1">{user.displayAddress}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                {user.role === "publisher" ? t("rolePublisher") : t("rolePartner")}
              </p>
              <p className="text-sm mb-6">
                {user.level === "seed" ? t("levelSeed") : user.level === "breaker" ? t("levelBreaker") : t("levelConqueror")}
              </p>
              
              <button
                onClick={() => { disconnect(); setShowAuthModal(false); }}
                className="w-full py-3 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors font-medium"
              >
                {t("disconnect")}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
