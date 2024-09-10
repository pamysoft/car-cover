import ImageUrl from '~/assets/rv-salenowon.jpg'

export function Slideshow(props) {
    return <div className={props.className}>
        <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url(${ImageUrl})`}}>
            <img src={ImageUrl} width="100%" height="auto" className="invisible w-full" alt="Banner Image" />
        </div>
    </div>
}