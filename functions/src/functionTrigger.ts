import * as functions from "firebase-functions";
import * as moment from "moment-timezone";

const formatTimestamp = "YYYY-MM-DD HH:mm:ss";

export const onUpdate = functions.firestore
  .document("{collectionId}/{documentId}")
  .onUpdate(async (snap) => {
    const newValue = snap.after.data();
    newValue.updatedAt = moment().format(formatTimestamp);
    return snap.after.ref.set(newValue, {
      merge: true,
    });
  });

export const onCreate = functions.firestore
  .document("{collectionId}/{documentId}")
  .onCreate(async (snap) => {
    const newValue = snap.data();
    newValue.createdAt = moment().format(formatTimestamp);
    newValue.updatedAt = moment().format(formatTimestamp);
    return snap.ref.set(newValue), {
      merge: true,
    };
  });

export const onWrite = functions.firestore
  .document("{collectionId}/{documentId}")
  .onWrite(async (snap) => {
    const newValue = snap.after.data();
    if (newValue) {
      newValue.createdAt = moment().format(formatTimestamp);
      newValue.updatedAt = moment().format(formatTimestamp);
      return snap.after.ref.set(newValue, {
        merge: true,
      });
    }
    return null;
  });


