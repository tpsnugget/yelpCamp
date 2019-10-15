var mongoose = require("mongoose"),
   Campground = require("./models/campground"),
   Comment = require("./models/comment")

var data = [
   {
      name: "Mama Gertie's",
      image: "https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      description: "Premium Mountaintop RV Sites, What makes these sites so special? Simply, the view. Wake up every morning and enjoy high mountain vistas above the rest of our RV Park. We are among a very few select parks in the Blue Ridge that can offer these premium mountain top RV sites. Mountainview sites are open April 1st– October 31st. Please call for more info. Ph: 828.686.4258"
   },
   {
      name: "Twin Lakes COE",
      image: "https://images.unsplash.com/photo-1536483229849-71255a26bbd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      description: "Twin Lakes Recreation Area is a 152-acre site consisting of a dense overstory of pines and mixed hardwoods. The site presently offers camping and a separate day use and boat launching area. Day use and camping facilities are separated to prevent user conflicts. The area is moderate to gently sloping with the northernmost campsites being located on the steepest terrain. Campgrounds facilities presently include a gatehouse/entrance, 2 Park Attendant campsites, 102 public campsites, 1 picnic shelter, 5 comfort stations with showers, 2 dump stations, 5 playgrounds, 1 designated swim area/beach, and associated paved roads and parking areas throughout. Day Use facilities presently include a new gatehouse/entrance installed in 2017, 1 volunteer host campsite, 27 picnic sites, 2 standard picnic shelters with water and electric service, 1 two lane boat ramp, 1 courtesy dock, 2 comfort stations, 1 playground, 2 designated swim areas/beaches, and associated paved roads and parking areas throughout. The campground experiences very high occupancy rates throughout the year and is Hartwell’s highest producer of camping revenue."
   },
   {
      name: "Grand Canyon Campground",
      image: "https://images.unsplash.com/photo-1468802337661-685a628d58a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      description: "On the North Rim of the Grand Canyon lies one of the best, least-known campgrounds in the West."
   }
]

function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
}




module.exports = seedDB