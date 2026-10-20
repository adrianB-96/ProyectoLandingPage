import Image from 'next/image';
import BackButton from '@/assets/SvgIcons/Contact/BackButton.svg';
import style from '@/style/contact/Hero.module.css';
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations('HeroContact');
  const tH = await getTranslations('HeaderContact');
  return (
    <div className={style.DivHero}>
      <a href='/' className={style.LinkBackButton}>
            <Image src={BackButton} alt='BackButton' className="size-6 relative overflow-hidden"></Image>
          <div className={style.BackButtonText}>
            <p>{tH("backPage")}</p>
          </div>
      </a>
      <div className={style.DivTitulo}>
        <h1 className={style.Titulo}>{t("title")}</h1> 
      </div>
    </div>
  )
}