import starImgUrl from '~/assets/starimg.jpg';

export function StarRating() {
    return <>
        <div className="mt-[0px] block">
            <div className="inline">
                <img className="inline" src={starImgUrl} alt="Rating" width="16" height="16" />
                <img className="inline" src={starImgUrl} alt="Rating" width="16" height="16" />
                <img className="inline" src={starImgUrl} alt="Rating" width="16" height="16" />
                <img className="inline" src={starImgUrl} alt="Rating" width="16" height="16" />
                <img className="inline" src={starImgUrl} alt="Rating" width="16" height="16" />
            </div>
            <div className="inline">
                (<b>10785</b> Reviews) <span className="verified hidden-xs">| Verified Customer Reviews</span> | 4.8/5 Positive
            </div>
        </div>
    </>
}