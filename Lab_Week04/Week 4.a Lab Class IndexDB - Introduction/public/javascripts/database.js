/*
 *  Copyright (C) The University of Sheffield - All Rights Reserved
 *  Written by Fabio Ciravegna (f.ciravegna@shef.ac.uk)
 *
 */

import * as idb from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';


////////////////// DATABASE //////////////////
// the database receives from the server the following structure

/** class WeatherForecast{
 *  constructor (location, date, forecast, temperature, wind, precipitations) {
 *    this.location= location;
 *    this.date= date,
 *    this.forecast=forecast;
 *    this.temperature= temperature;
 *    this.wind= wind;
 *    this.precipitations= precipitations;
 *  }
 *}
 */
let db;

const SUMS_DB_NAME= 'db_sums';
const SUMS_STORE_NAME= 'store_sums';

/**
 * it inits the database and creates an index for the sum field
 */
async function initDatabase(){
    if (!db) {
        db = await idb.openDB(SUMS_DB_NAME, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(SUMS_STORE_NAME)) {
                    let sumsDB = upgradeDb.createObjectStore(SUMS_STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    sumsDB.createIndex('sum', 'sum', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase= initDatabase;
/**
 * it saves the sum into the database
 * if the database is not supported, it will use localstorage
 * @param sumObject: it contains  two numbers and their sum, e.g. {num1, num2, sum}
 */
async function storeSumData(sumObject) {
    console.log('inserting: '+JSON.stringify(sumObject));
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(SUMS_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(SUMS_STORE_NAME);
            await store.put(sumObject);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(sumObject));
        } catch(error) {
            console.log('error: I could not store the element. Reason: '+error);
        }
    }
    else localStorage.setItem(sumObject.sum, JSON.stringify(sumObject));
}
window.storeSumData= storeSumData;

/**
 * it retrieves all the numbers that have summed to sumValue from the database
 * if the database is not supported, it will use localstorage
 * @param sumValue: a number
 * @returns objects like {num1, num2, sumValue}
 */
async function getSumData(sumValue) {
    if (!db)
        await initDatabase();
    if (db) {
        console.log('fetching: ' + sumValue);
        let tx = await db.transaction(SUMS_STORE_NAME, 'readonly');
        let store = await tx.objectStore(SUMS_STORE_NAME);
        let index = await store.index('sum');
        let readingsList = await index.getAll(IDBKeyRange.only(sumValue));
        await tx.complete;
        if (readingsList && readingsList.length > 0) {
            for (let elem of readingsList)
                addToResults(elem);
        } else {
            // if the database is not supported, we use localstorage
            const value = localStorage.getItem(sumValue);
            if (value == null)
                addToResults();
            else addToResults(value);
        }
    } else {
        const value = localStorage.getItem(sumValue);
        if (value == null)
            addToResults();
        else addToResults(value);
    }
}
window.getSumData= getSumData;
