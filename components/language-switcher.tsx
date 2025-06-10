"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { languages, type Language } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages[language]

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[120px]"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-full mt-2 right-0 z-50"
            >
              <Card className="shadow-xl border-0 min-w-[200px]">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {Object.entries(languages).map(([code, lang]) => (
                      <motion.button
                        key={code}
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setLanguage(code as Language)
                          setIsOpen(false)
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          language === code ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </div>
                        {language === code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Check className="w-4 h-4 text-blue-600" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
