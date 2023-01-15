import { useState } from "react";
import { items } from "./Items.json";
import Glide from '@glidejs/glide'




export default function CarouselBar() {

  // new Glide('.glide').mount()
  return (
    
    <div className="glide">
    <div data-glide-el="track" className="glide__track">
      <ul className="glide__slides">
        <li className="glide__slide"></li>
        <li className="glide__slide"></li>
        <li className="glide__slide"></li>
      </ul>
    </div>
  </div>
  );
}
