const fs = require('fs');


const tour = JSON.parse(fs.readFileSync('dev-data/data/tours-simple.json'));



exports.get_all_tours = (req, res) => {
      res.status(200).json({
            status: 'success',
            results: tour.length,
            data: {
                  tour_data: tour,
            },
      });
}

exports.create_tours = (req, res) => {
      const new_id = tour[tour.length - 1].id + 1; // Creating ID......
      const new_tour = Object.assign({ id: new_id }, req.body); //first parameter target second source.......copy the soucre object to target...
      tour.push(new_tour);
      fs.writeFile('dev-data/data/tours-simple.json', JSON.stringify(tour), (err) => {
            res.status(200).json({
                  status: 'Success...',
                  data: {
                        tour: new_tour,
                  },
            });
      });
}

exports.get_tour = (req, res) => {
      const id = req.params.id * 1;
      const single_tour = tour.find((el) => {
            return el.id === id
      });
      if (!single_tour) {
            return res.status(404).json({
                  message: "Not Found!",
            });
      }
      res.status(200).json({
            status: 'success',
            data: {
                  tour_data: single_tour,
            }
      });
}

exports.delete_a_tour = (req, res) => {
      const id = req.params.id * 1;
      const delete_tour_find = tour.find((el) => {  // here find method returns the test value of array element.........
            return el.id === id
      });

      if (!delete_tour_find) {
            return res.status(404).json({
                  message: "Not Found!",
            });
      }
      tour.splice(tour.indexOf(delete_tour_find), 1); // here indexof find the position and splice removes the finded postion array.........
      fs.writeFile('dev-data/data/tours-simple.json', JSON.stringify(tour), (err) => {
            res.status(204).json({
                  message: "Deleted"
            })
      });

}
