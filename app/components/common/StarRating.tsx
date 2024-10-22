import starImgUrl from '~/assets/starimg.jpg';

export function StarRating() {
    return <>
        <div className="mt-[5px] block text-[14px]">
            <div className="inline">
                <img className="inline" src={starImgUrl} alt="Rating" width="14" height="14" />
                <img className="inline" src={starImgUrl} alt="Rating" width="14" height="14" />
                <img className="inline" src={starImgUrl} alt="Rating" width="14" height="14" />
                <img className="inline" src={starImgUrl} alt="Rating" width="14" height="14" />
                <img className="inline" src={starImgUrl} alt="Rating" width="14" height="14" />
            </div>
            <div className="inline">
                (<b>10785</b> Reviews) <span className="verified hidden-xs">| Verified Customer Reviews</span> | 4.8/5 Positive
            </div>
        </div>
    </>
}