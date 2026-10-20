import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('Hero');
  return (
    <div className="flex items-center justify-center w-full pt-20 sm:p-10 md:p-20 lg:p-40">
      <div className="flex flex-col w-full max-w-[63rem] min-h-[10rem] md:h-auto justify-center flex-shrink-0 text-center px-4">
        <h1 className="font-semibold leading-tight md:leading-[3.5rem] text-3xl sm:text-4xl md:text-5xl lg:text-[3rem]" style={{fontFeatureSettings: '"liga" off, "clig" off', color: 'var(--Neutral-00, #FFF)' }}>{t("title")}</h1>
      </div>
    </div>
  )
}
