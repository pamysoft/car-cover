import atvCovers from '~/assets/collections/atv-covers.jpg';
import carCovers from '~/assets/collections/car-covers.jpg';
import golfCartCovers from '~/assets/collections/golf-cart-covers.jpg';
import hearseCovers from '~/assets/collections/hearse-covers.jpg';
import limousineCovers from '~/assets/collections/limousine-covers.jpg';
import motorcycleCovers from '~/assets/collections/motorcycle-covers.jpg';
import rvCovers from '~/assets/collections/rv-covers.jpg';
import scooterCovers from '~/assets/collections/scooter-covers.jpg';
import truckCovers from '~/assets/collections/truck-covers.jpg';

const images = [
    atvCovers,
    carCovers,
    golfCartCovers,
    hearseCovers,
    limousineCovers,
    motorcycleCovers,
    rvCovers,
    scooterCovers,
    truckCovers,
]

export function FeaturedCollection(props) {
    return <div className={props.className}>
        <div className="container">
            <div className="mt-[15px] grid grid-cols-2 gap-[15px] md:grid-cols-3">
                {images.map((imageUrl) => (    
                    <div key={imageUrl}>
                        <a className="block" target="_self" href="#">
                            <img src={imageUrl} width="100%" height="100%" />
                        </a>
                    </div>
                    )
                )}
            </div>
        </div>
    </div>
}