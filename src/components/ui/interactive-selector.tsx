import { useEffect, useState } from 'react'
import { FaCampground, FaCarSide, FaFire, FaHotTub, FaWater } from 'react-icons/fa'

interface SelectorOption {
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

const options: SelectorOption[] = [
  {
    title: 'Tent Pitching',
    description: 'Bring your own tent, ₱300/pax',
    image:
      'https://lh3.googleusercontent.com/place-photos/AG9NLjDalgpL-8xi0z6ocgfxP3qPJ_QIZIhjrL1DzUxu_jemEz8tQ7-Xu2PebGBdG_zt0gWc1Ac_WMPOL2zla_uIDgJooRSAG5IsWORur-t4-o13wpXfKWoml1bCskMrgH2jEMzKiKv2i_1qftqsHdQ=s1200',
    icon: <FaCampground size={24} className="text-white" />,
  },
  {
    title: 'Carcamping',
    description: 'Tent beside your car, ₱1,500',
    image:
      'https://lh3.googleusercontent.com/place-photos/AG9NLjBOrfUAxkbNgbrVDGvmYXqXIbfLFSeglkZRQYjzf-4xGc1lj_gT__ExiOgbTZtkEWIag88Al1e3EkoooTZqiIjq7do3NPtm0JEN3N8JkP7HNLdErCbMwLoNB38F3oLYRrROCWOhzKuMmRZMMA=s800',
    icon: <FaCarSide size={24} className="text-white" />,
  },
  {
    title: 'Lakeside Balsa',
    description: 'Free raft & life vests on Lumot Lake',
    image:
      'https://lh3.googleusercontent.com/place-photos/AG9NLjCpxqLuUNUfpw4jc6B1aVFakwvT0r7B4UmoORz9IkaKP0QV9pK7bVwA0kyJdVx39ksNYrExtra70ogcxClbdfRt84fE5z2MJyAbErYEvAUfyV68Zsnc1OSrZuqC2ONy5TCcu1ZqliWqFfPMJJ0=s800',
    icon: <FaWater size={24} className="text-white" />,
  },
  {
    title: 'Bonfire Nights',
    description: 'Bonfire pit & griller included, free',
    image:
      'https://lh3.googleusercontent.com/place-photos/AG9NLjBoCymp_aiKSHtuvbJ-IR8h3Ueu70xZUNJKiiYyzdsFZTptY8dKAEJTzMCkfQJgtZ-f4Ah123YuIy8p-mDtNxxCgitB_lm1LC_Llbh4iUlaEfY74Dfdogp9-wWGh9TyMgkQWPb59lwrh1QPTKIiMbNI=s800',
    icon: <FaFire size={24} className="text-white" />,
  },
  {
    title: 'Aircon Kubo',
    description: 'Pavillion & Kubo units, from ₱3,000',
    image:
      'https://lh3.googleusercontent.com/place-photos/AG9NLjAnQ-bG0e2FceA5K0VQPEG6RF_NfT6x5wKmD2gtSNSpMyb_XykO2X8FTAmppKqF85tYBSNH_suLWoiZgS0N33wg-sKiUNF5ryG5n2aJ0okiAWK6GJD_NrS_CB0tPXTZIg__GjbxABszzWwe=s800',
    icon: <FaHotTub size={24} className="text-white" />,
  },
]

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 180 * i)
      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#222] font-sans text-white py-16">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg animate-fadeInTop [animation-delay:0.3s]">
          Twelve Ways to Camp
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto animate-fadeInTop [animation-delay:0.6s]">
          Lakeside camping on Lumot Lake, Cavinti — tent to kubo, one base fee.
        </p>
      </div>

      <div className="h-12" />

      {/* Options Container */}
      <div className="flex w-full max-w-[900px] min-w-[320px] sm:min-w-[600px] h-[400px] mx-0 items-stretch overflow-hidden relative px-4 sm:px-0">
        {options.map((option, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={option.title}
              className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '60px',
                minHeight: '100px',
                margin: 0,
                borderRadius: 0,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isActive ? '#fff' : '#292929',
                backgroundColor: '#18181b',
                boxShadow: isActive
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                zIndex: isActive ? 10 : 1,
                willChange: 'flex-grow, box-shadow, background-size, background-position',
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Shadow effect */}
              <div
                className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? '0' : '-40px',
                  height: '120px',
                  boxShadow: isActive
                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
                }}
              />

              {/* Label with icon and info */}
              <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-4 gap-3 w-full">
                <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                  {option.icon}
                </div>
                <div className="text-white whitespace-pre relative">
                  <div
                    className="font-bold text-lg transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="text-base text-gray-300 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-6 max-w-xl px-6 text-center text-xs text-gray-400">
        Photos pulled from the campsite's Google Maps listing for this preview — swap for
        AniCa's own photography before this page goes live.
      </p>
    </div>
  )
}

export default InteractiveSelector
