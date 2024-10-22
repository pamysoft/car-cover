import { usePageSettings } from './StaticContentProvider'

export function Slideshow(props) {
    const settings = usePageSettings()
    return <div className={props.className}>
        <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url(${settings.bannerImage})`}}>
            <img src={settings.bannerImage} width="100%" height="auto" className="invisible w-full" alt="Banner Image" />
        </div>
    </div>
}