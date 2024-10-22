export function ProductAccordion() {
    const descriptionHtml = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`

    const headingClass = "rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']"
    return (
        <div className="mt-[30px]">
            <div className="rv-collapse group py-[3px]">
                <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']">Details</h4>
                <div className="mt-[8px] hidden group-[.is-active]:block">
                    <div className="[&>h2]:text-[18px] [&>h2]:mb-[10px]">
                        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    </div>
                </div>
            </div>
            <div className="rv-collapse group py-[3px]">
                <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']">Shipping</h4>
                <div className="mt-[8px] hidden group-[.is-active]:block">
                    <div className="[&>h2]:text-[18px] [&>h2]:mb-[10px]">
                        <p>All orders ships within 24 hours.</p>
                        <h2>Free shipping to the USA and Canada</h2>
                        <p>CarCover.com offers FREE Shipping with UPS / FEDEX / USPS on all orders to anywhere in the US and Canada.
                        </p><h2>Express and overnight shipping</h2>
                        <p>CarCover.com offers express and overnight shipping for all products, with rates starting at $25 for express shipping and $55 for overnight shipping, depending on the product weight. To receive your order faster, select the express or Overnight Shipping option at checkout. Please note that express and overnight shipping is not available for PO Box addresses.</p>
                        <h2>International Shipping</h2>
                        <p>CarCover.com provides international shipping via FEDEX or USPS for a flat rate of $120. The delivery time typically ranges from 7 to 10 business days, although it may vary.</p>
                        <h3>Tracking Number</h3>
                        <p>Once you've placed your order, we'll send you an email confirmation with the carrier details and tracking number.</p>
                    </div>
                </div>
            </div>
            <div className="rv-collapse group py-[3px]">
                <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']">Warranty</h4>
                <div className="mt-[8px] hidden group-[.is-active]:block">
                    <div className="[&>h2]:text-[18px] [&>h2]:mb-[10px]">
                        <p>With numerous companies available, you may be wondering which one is the best choice and why.</p>

                        <p>Well, at CarCover.com, we're confident that our covers are top-notch. The likelihood of you having to replace your cover is small, however, if you ever have any issues, our Lifetime Warranty has got you covered..</p>

                        <h2>How does the warranty work?</h2>
                        <p>Our warranty provides coverage against any defects in materials and craftsmanship, safeguarding your investment in our product. As the original purchaser, you have the opportunity to request replacement covers multiple times during your ownership tenure, provided you still retain possession of the item. It's important to note that this warranty is non-transferrable and applies exclusively to the original buyer.</p>

                        <p>Starting from the date of purchase, the warranty operates on a prorated basis. Therefore, if a replacement cover is required within a certain timeframe, there may be associated costs based on our prorated schedule.</p>

                        <p>It's important to note that CarCover.com will never ask you to ship back a defective item.</p>

                        <p>To ensure smooth processing, we kindly ask you to keep your receipt or order ID for any warranty claims.</p>

                        <h3>How to file a warranty claim?</h3>
                        <p>Send us an email to <a href="mailto:Warranty@CarCover.com">Warranty@CarCover.com</a> and one of our agents can guide you through your claim. Make sure your email has: your full name, order ID, what's wrong, when it happened, and pictures showing the problem. We only handle warranty claims through email.</p>

                        <p>You can find additional information about our Warranty Policy in our <a href="/terms-and-conditions#Warranty-Policy-Conditions">Terms and Conditions</a>.</p>
                    </div>
                </div>
            </div>
            <div className="rv-collapse group py-[3px]">
                <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']">Installation</h4>
                <div className="mt-[8px] hidden group-[.is-active]:block">
                    <div className="[&>h2]:text-[18px] [&>h2]:mb-[10px]">
                        <h2>Car Cover Installation Instruction:</h2>
                        <ol>
                            <li>Position the cover over the vehicle ensuring the front side is facing you. The front can be identified by a tag, label, or logo.</li>
                            <li>If your vehicle's antenna isn't retractable or removable, utilize the provided antenna patch with your cover. Refer to the ANTENNA PATCH INSTALLATION section below for details. When using the patch, ensure you pass the antenna through the cover first.</li>
                            <li>If your cover comes with mirror pockets, fit them over the mirrors.</li>
                            <li>Extend the cover over both the front and rear bumpers.</li>
                        </ol>
                        <p></p>
                        <p></p><h2>Car Cover Removal Instruction:</h2>
                        <ol>
                            <li>Unhook the cover from beneath both the front and rear bumpers.</li>
                            <li>Lift and fold both sides of the cover onto the vehicle's top, forming a strip about 2 feet (60 cm) in width.</li>
                            <li>Beginning from the vehicle's front, fold the cover in sections of roughly three feet (1 meter) from the front towards the back.</li>
                        </ol>
                        <p></p>
                        <p></p><h3>Antenna Patch Installation:</h3><p></p>
                        <p>If your antenna doesn't retract, our antenna patch is here to assist. It's straightforward to install and should take just a few minutes.
                        </p><ol>
                            <li>Fit the cover onto your vehicle to identify the exact position where the antenna touches.</li>
                            <li>The front of the cover is labeled with a tag. Begin by positioning this at the front, and then smoothly pull the cover towards the back of the vehicle.</li>
                            <li>When you reach the point where the cover meets the antenna, mark this location.</li>
                            <li>Carefully make a small cut at the marked spot for the antenna to pass through. It's best to keep the incision minimal to prevent external elements from penetrating under the cover.</li>
                            <li>Align the antenna patch over this cut, allowing the antenna to slide through.</li>
                            <li>The patch will restore the cover, ensuring it remains sealed and protected.</li>
                        </ol>
                        <p></p>
                        <p></p><h3>Cable Lock Installation:</h3><p></p>
                        <p>The Cable Lock sets comprise the cable itself, the accompanying lock, and a key designed specifically for the lock. All of our car covers come equipped with two grommet holes situated at the bottom, in the middle, on both sides of the cover.</p>
                        <p>To use the steel cable effectively, it should be threaded through the loop at one end and securely fastened to itself at the opposite end, as illustrated. The cable is then passed beneath the vehicle, threading through the remaining grommet that is scratch-resistant, and finally, it is secured in place using the provided lock.</p>
                        <p>It's worth noting that the cable lock set is exclusively included with our Gold Shield 5L car cover only.</p>
                        <center><img src="https://cdn.shopify.com/s/files/1/0607/7064/8154/files/cable-lock-installation_1.jpg?v=1728607111" alt="Cable Lock Installation" /></center>
                        <hr />
                        <p></p><h4>IMPORTANT WARNINGS:</h4><p></p>
                        <p><b>WARNING TO OWNERS OF REPAINTED VEHICLE:</b> Applying a cover to a newly painted surface might harm it. If your car has recently been painted, please consult with your painter or body shop regarding the guidelines for using this cover.</p>
                        <p><b>CAUTION IN FREEZING CONDITIONS:</b> On rare occasions, if a heavy downpour is immediately followed by temperatures plummeting below freezing, the cover might freeze to an ice layer formed between the car and the cover. If this occurs, DO NOT forcefully remove the cover. Should you need to take the cover off, pour warm water over the car and gently lift the cover, inspecting both its surface and the vehicle's during the process. If you feel any resistance, halt immediately — this means the ice hasn't fully melted. Pour more warm water on the affected area and continue.</p>
                        <p><b>CAUTION IN WINDY CONDITIONS:</b> If you're in areas with high winds or storing your vehicle for a long time, ensure you fasten the provided buckles to snugly fit the cover under both the car's front and rear. This should be done even if you're using the optional lock and cable. This cover isn't a substitute for a garage. In strong winds, regularly check for any loose flapping. If wind gets beneath the cover, it might dislodge it or cause damage to the cover itself.</p>
                        <p></p><h5>ADDITIONAL TIPS:</h5>
                        <ul>
                            <li>Do NOT cover a wet vehicle</li>
                            <li>Do NOT cover a hot tail pipe</li>
                            <li>Do NOT cover a vehicle with the windows or sun/moon roof open.</li>
                            <li>Do NOT cover a vehicle that has recently been painted</li>
                            <li>Do NOT cover a vehicle that has just been painted.</li>
                            <li>If you've waxed your car, ensure that the vehicle is fully dry before installing the cover.</li>
                            <li>Do NOT cover a convertible vehicle with the top down</li>
                            <li>Do NOT cover a car directly after being driven. Let the car cold down before putting the car cover on.</li>
                            <li>Do NOT cover a car that has been exposed to the sun for an extended period. Ensure the vehicle has cooled down before putting on the cover.</li>
                        </ul>
                        <p></p>
                        <p>Adhering to these guidelines is essential. We won't be accountable for any damage to your vehicle if these instructions aren't followed.</p>
                    </div>
                </div>
            </div>
            <div className="rv-collapse group py-[3px]">
                <h4 onClick={toggleMenuItem} className="rv-collapse-toggle flex cursor-pointer items-center justify-between py-[3px] text-[16px] font-medium uppercase after:font-['icons-blank-theme'] after:text-[30px] after:content-['\e622'] group-[.is-active]:after:content-['\e621']">Cleaning</h4>
                <div className="mt-[8px] hidden group-[.is-active]:block">
                    <div className="[&>h2]:text-[18px] [&>h2]:mb-[10px]">
                        <p>It is very important to take good care of your car cover so that the performance of the cover is not affected. Many contaminants such as dirt, grease, oil, etc. can be very harmful to the cover’s performance and it might even deteriorate the cover to the point that the water resistance become invalid. Therefore, we recommend that you regularly wash your cover so that it can protect your vehicle more effectively for longer period of time.</p>
                        <p>The car cover can be washed either by hand (recommended) or by washing machine.</p>
                        <p>To wash the cover by hand, simply install the cover on your vehicle and use a water hose to remove all the contaminants, then use a cloth with any multi-purpose cleaner to wash the cover. Apply the water again, then use can use a dry cloth or towel to dry out the cover or simply let it air dry.</p>

                        <p>For washing machine cleaning:
                        </p><ul>
                            <li>Use the largest washing machine possible (for very large vehicles, it is recommended to use industrial size machines).</li>
                            <li>Put in on GENTLE mode.</li>
                            <li>Use mild powder detergent to clean the cover with cold water. DO NOT use bleach or fabric softener.</li>
                            <li>Rinse the cover twice in order to remove all the detergent.</li>
                            <li>Cover must be air dry.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function toggleMenuItem(event: React.MouseEvent<HTMLHeadingElement>) {
    event.currentTarget.parentElement?.classList.toggle('is-active');
}