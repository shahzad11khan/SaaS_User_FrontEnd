 import mobile from '../../assets/app banner/iPhone 13 Pro Mockup Right View.png';
 import inquiriBg from '../../assets/app banner/Group 1000004714.svg';
import { useTranslation } from 'react-i18next';
export const AppBanner = () => {
    let {t} = useTranslation();
    let infoArr = t('appBanner.infoServices' , { returnObjects: true } )
  return (
    <>
    {/* mobil app banner */}
    <div className="px-4  flex w-full justify-center bg-white  md:py-20 rounded-lg ">
        <div className=" mx-4 mt-10 pt-10 md:pt-0  md:h-[600px] border bordre-solid flex flex-col md:flex-row items-center justify-center w-[1200px] h-[550px] bg-[#F0FFF8] rounded-xl ">
            <div className='full md:w-[40%]'>
                <div className="w-[200px] h-[200px] md:w-[386px] md:h-[386px] rounded-full flex items-center bg-[#B6E0CA]">
                    <img src={mobile} alt="app" />
                </div>
            </div>
            <div className='flex px-5 md:px-0 pt-16 flex-col gap-5 md:w-[50%]'>
                <h1 className="text-[34px] outfit md:text-[54px] font-semibold leading-[40px] md:leading-[60px]">{t('appBanner.mobile.heading.0')}<span className="text-[#219653]">{t('appBanner.mobile.heading.1')}</span></h1>
                <p className=' text-[14px] outfit'>{t('appBanner.mobile.paragraph')}</p>
                <div className='flex flex-col items-center md:flex-row gap-5'>
                    <img className='h-[50px] w-[160px]' src="https://s3-alpha-sig.figma.com/img/054d/6736/31fd8c66307e5a0eb0a2a8e6810ee27d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=STo5aWvTlTiwKObsrQ-Sidw0HHO2SA8K1dsaXSbl3K3d9AdfN~H8-vznMkkOhID8cKFhcD-TpCjcH13XtdZMirT8pK3qhgpTBh~GKJYi9Smst8dvFdd~eRKexXOi0U0KZwwVqBuUolu333TnItDrMqOnBPP40lhMEpmoi4Nv-biELAqLUSIjCwhGgez5OAiF6wvjoWYutbGB3D7T5k8gEKwec9iQX-pqyyvauFeAzYRIPixfFgttf6mqF5POQZiEU38gw3EO5CNXMfQYqn1DijklCkzUHvuGKKa3n5Bbc0cMiFD7qdNfLac4F2-9PPhAYyeI7FraZOTLhocZ0hRm3g__" alt="" />
                    <img className='h-[50px] w-[160px]' src="https://s3-alpha-sig.figma.com/img/d64b/4628/aba4dd9dce4c1193b38894946ce8bd9c?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MrxgX9rPeadcTrQGpwdths-pkaVoO2wXJqCgTSP0blnpT0plAzLvTSkTZwsqyAh841KI0p1Ds-R~t~jAPMhTR8mf-EXVZuKePm23evqa~Vb50C4-ZIQ2BkK17CAeJ7sj4zo7KI32F-HJdTezueEme25QHXmgkpsl0RcHhEPm7c8Ddhs0sIUOyIlgZKKxTPCOw~kfQ9BWk~8717mMaM8vtOsvmSWCyo31L7PLgYsUdboz99p45kwM3Bx7N0RnnhTaMznqRmqITxdGhq9yY2VSsdID0JX38q99TSwLeTbb7Vm6BvWsccsQa45wljmPrrjBmQc80ZPk7By3c~1wwwwHyw__" alt="" />
                </div>
            </div>
        </div>
    </div>
    <hr />
    {/* information about the service */}
     <div className='flex  justify-center py-10'>
        <div className='flex flex-wrap gap-16 justify-center md:justify-around w-[1000px] h-[57px]'>
            {infoArr.map((el,idx) => (
                <div className='' key={idx}>
                    <h1 className='text-[24px] outfit font-semibod'>{el[0]}</h1>
                    <p className='text-[14px] outfit'>{el[1]}</p>
                </div>
            ))}
        </div>
    </div>
    {/* inquiries with button */}
    <div className={`relative flex justify-center  bg-[#FCF5DC]`} >
        <img className='absolute right-0 z-0' src={inquiriBg} alt="" />
        <div className='z-10 flex flex-col md:flex-row gap-5 md:gap-10  items-center py-20'>
            <p className='text-center  w-[70%] md:w-auto text-[24px] outfit font-600'>{t('appBanner.inqiries.paragraph')}</p>
            <button className="outfit text-[16px] rounded-full py-3 px-5 bg-[#013D29]  text-white">{t('appBanner.inqiries.bText')}</button>
        </div>
    </div> 
    </>
  )
}
