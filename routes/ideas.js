const express = require('express');
const router = express.Router();

const Idea = require ('../models/Ideas'); // Adjust the path as necessary



const ideas = [
    {
        id: 1, 
        text: 'Positive Newsletter, where people share their positive news',
        description: 'This is the first idea',
        tag: "Positive",
        username: 'William',
        date: '2025-06-13'
    },

    {
        id: 2, 
        text: 'Negative Newsletter, where people share their Negative news',
        description: 'This is the second idea',
        tag: "Negative",
        username: 'Ismoilov',
        date: '2025-06-03'
    },

    {
        id: 3, 
        text: 'Google Newsletter, where people share their news about Google',
        description: 'This is the third idea',
        tag: "Google",
        username: 'Google',
        date: '2001-06-13'
    }


]

// get all ideas
router.get('/', async (req,res) => {
    try{
        const ideas = await Idea.find();
        res.json({success: true, data: ideas});
    } catch(err){
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
})

// get idea by id
router.get('/:id',  async (req, res) => {
     try {
        const idea = await Idea.findById(req.params.id);
        res.json({success: true, data: idea}); 
     } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'});
        
     }
})

//add an idea
router.post('/',  async (req, res) => {

    const idea =  new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const savedIdea = await idea.save();
        res.json({success: true, data: savedIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'});
    }
    // res.send(req.body.text);
})

// update idea by id
router.put('/:id',  async (req, res) => {
   try {
    const idea = await Idea.findById(req.params.id);
    //math the usernames
    if(idea.username === req.body.username){
        const updatedIdea = await Idea.findByIdAndUpdate(
    req.params.id,
    {
        $set: {
            text: req.body.text,
            tag: req.body.tag
        }
    },
    { new: true}
  );
   return res.json({success: true, data: updatedIdea});
    }
    //usernames do not match
    res.status(403).json({success: false, 
        error: 'You are not autherized to update this idea as you are not the owner of this idea'});

} catch(error){
    console.log(error);
    res.status(500).json({success: false, error: 'Something went wrong'});
}
})


//delete idea by id

router.delete('/:id',  async (req, res) => {
    try {

        const idea = await Idea.findById(req.params.id);

        //match the usernames
        if(idea.username === req.body.username){
            await Idea.findByIdAndDelete(req.params.id);
             return res.json({success: true, data: {} });
        }

        // if the usernames do not match

        res.status(403).json({success: false, 
            error: 'You are not allowed to delete this idea as you are not the owner of this idea'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something went wrong'});        
    }
})

module.exports = router;