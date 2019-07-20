var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Video = require('../models/videos');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
    Video.find()
    .then(videos => {
      res.status(200).json({
        message: 'Video fetched successfully',
        videos: videos
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.post('/', (req, res, next) => {
  const maxVideoId = sequenceGenerator.nextId("videos");

  const video = new Video({
    id: maxVideoId,
    title: req.body.title,
    subtitle: req.body.subtitle,
    imageUrl: req.body.imageUrl
  });

  video.save()
    .then(createdVideo => {
      res.status(201).json({
        message: 'Video added successfully',
        video: createdVideo
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Video.findOne({ id: req.params.id })
    .then(video => {
        video.title = req.body.title;
        video.subtitle = req.body.subtitle;
        video.imageUrl = req.body.imageUrl;

        Video.updateOne({ id: req.params.id }, video)
        .then(result => {
          res.status(204).json({
            message: 'Video updated successfully'
          })
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Video not found.',
        error: { video: 'Video not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
    Video.findOne({ id: req.params.id })
    .then(video => {
        Video.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Video deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
