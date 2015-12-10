import ApplicationRoute from 'discourse/routes/application';
import { onToolbarCreate } from 'discourse/components/d-editor';
import DiscourseEditor from 'discourse/components/d-editor';

export default {
  name: 'extend-for-record-audio',

  initialize() {
    DiscourseEditor.reopen({
      actions: {
        recordAudio: function () {
          navigator.getUserMedia  = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null;

          function onSuccess(stream) {
            console.log("SUCCESS");
          }

          function onError(error) {
            console.log("THERE HAS BEEN AN ERRIR");
          }

          navigator.getUserMedia({audio: true}, onSuccess, onError);
        }
      },

      _hasGetUserMedia: function () {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMed);
      },

    });

    onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: 'record',
        group: 'extras',
        icon: 'microphone',
        action: 'recordAudio'
      });
    });
  }
}