import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
     
  constructor() {}
  public technologies : Array<{ name: string, description: string, image: string }> = [
    { 
       name : 'Plastic Bottles & Containers', 
       description : " Recycle plastics by shape: bottles, jars, jugs and tubs. The 'chasing arrows' symbol doesn't necessarily mean it's recyclable. Caps are recyclable, but you must put them back onempty containers before tossing in the bin.",
       image: "\assets\\images\\plastic.png"
    },
    { 
       name : 'Food & Beverage Cans', 
       description : 'Recycle all empty tin, aluminum, and steel cans.Remove plastic lids from any food or beverage cans before recycling. Note: empty aerosol cans can also be recycled, but be sure they are empty and never include any aerosol caps.',
       image:"\assets\\images\\cans.png"
    },
    { 
       name : 'Paper', 
       description : 'Paper, newspaper, and magazines are good to recycle. Soiled and wet paper should be placed in the trash.',
       image: "\assets\\images\\newspaper.png"
    },
    { 
       name : 'Flattened Cardboard & Paperboard', 
       description : 'Flatten and recycle all cardboard and paperboard. Break down and flatten cardboard boxes to make room for more materials to fit in your recycling. Be  sure to close the lid on your recycling container to keep materials dry.',
       image: "\assets\\images\\packages.png"
    },
    { 
       name : 'Glass Bottles & Containers', 
       description : 'Glass recycling rules vary by city, county and state. If acceptable, make sure containers are empty. Tip - Check your local recycling program. Your community could accept glass in its curbside program, or there could bedrop-off locations, or it mighthave to go in the trash. Check your local recycling program to confirm that glass is accepted in the curbside program. Some communities accept glass curbside, or there might be drop-off locations, or it might have to go in the trash ? if not accepted.',
       image: "\assets\\images\\wine.png"
    }
  ];


  public nonRecyclables : Array<{ name: string, description: string, image: string }> = [
   { 
      name : 'Plastic Bags', 
      description : "Plastic bags are not accepted as part of curbside recycling programs - they get tangled in equipment and threaten worker safety. Do not bag recyclables as materials inside may not get recycled. Reuse plastic bags. ",
      image: "\assets\\images\\bag.png"
   },
   { 
      name : 'Plastic Wrap & Film', 
      description : 'Plastic wrap, bubble wrap, sandwich bags and freezer bags should not go in the recycle bin.Reuse whenever possible for presents, moving, or storage of similar items, or look for local options to recycle.',
      image: "\assets\\images\\plastic-wrap.png"
   },
   { 
      name : 'Flexiable Packaging', 
      description : 'Flexible packaging like chip bags and juice or soup pouches cannot be recycled in curbside programs. This type of packaging is made from multiple materials preventing it from being recycled.',
      image: "\assets\\images\\snack.png"
   },
   { 
      name : 'Wax or plastic coating cups', 
      description : 'Cups with plastic or waxed coatings are not recyclable. The plastic lids should be trashed as well. nvest in and carry a reusable cup instead. ',
      image: "\assets\\images\\cups.png"
   },
   { 
      name : 'Polystyrene Foam & Plastic', 
      description : 'Polystyrene foam, plastic "to-go" containers and cups are made of non-recyclable materials, and are not acceptable in the curbside recycling program. Packing peanuts aren’t recyclable either, however some shipping stores will take peanuts back for reuse.',
      image: "\assets\\images\\styrofoam.png"
   },

 ];

  public captureName(event: any) : void
  {
     console.log(`Captured name by event value: ${event}`);
  }

}
