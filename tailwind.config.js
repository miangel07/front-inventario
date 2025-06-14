// import { heroui } from "@heroui/theme";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}", "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       rotate: {
//         "y-180": "180deg", 
//       },
//       perspective: {
//         1000: "1000px", 
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [heroui()],
// };


import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      rotate: {
        "y-180": "180deg", 
      },
      perspective: {
        1000: "1000px", 
      },
            fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
//         // Colores principales del sistema
        primarys: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
//         // Verde de acento para acciones positivas
        accents: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
//         // Naranja para advertencias e información importante
        warnings: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
//         // Rojo para errores y acciones peligrosas
        dangers: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
//         // Colores de inventario específicos para tu sistema
        inventorys: {
          // Estados de stock
          'in-stock': '#10b981',      // Verde para productos disponibles
          'low-stock': '#f59e0b',     // Naranja para stock bajo
          'out-stock': '#ef4444',     // Rojo para sin stock
          'reserved': '#6366f1',      // Azul para productos reservados
          
          // Fondos y elementos de interfaz
          'bg-main': '#f8fafc',       // Fondo principal
          'bg-card': '#ffffff',       // Fondo de tarjetas
          'border-light': '#e2e8f0',  // Bordes suaves
          'text-primary': '#1e293b',  // Texto principal
          'text-secondary': '#64748b', // Texto secundario
        }
      },
//       // Extensiones adicionales para tu sistema de inventario
      boxShadows: {
        'inventory-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'inventory-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animations: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframess: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUps: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
      themes: {
        light: {
          colors: {
            // Personaliza los colores aquí
            primary: {
              DEFAULT: "#334155", // Indigo más intenso
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#10B981", // Verde esmeralda
              foreground: "#ffffff",
            },
                    checkbox: {
          DEFAULT: "#8B5CF6", // Púrpura personalizado
          foreground: "#ffffff",
        },
            success: {
              DEFAULT: "#059669", // Verde más oscuro
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#F59E0B", // Ámbar
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#EF4444", // Rojo más brillante
              foreground: "#ffffff",
            },
          },
        },
      },
    }),],
};