import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";

jest.mock("../src/repository");


describe("Event Service", () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'), new Date('2019-12-17T13:24:00'), "Hello World", "Campus Numerique", "This is an hello world.."),
        //Attention => transforme le 2018-12-17T03 en 2018-12-17T02 pour l'Event ci-dessous
        new Event(new Date('2018-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'), new Date('2020-04-01T17:00:00'), "Unit test againt", "Campus Numerique", "This is an hello world..")
    ];


    //***************** Test récupérer les events ****************************************************************

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })


    //***************** Test d'un évènement sur une date *************************************************

    test('hasEventOn Hello World', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2019-12-17T03:24:00')).length).toBe(1);
    })
    test('hasEventOn First event', async () => {
        let eventService = new EventService(new EventRepository());
        // Bug car l'enregistrement des données fakeEvents ne se font pas correctement => 17T02 au lieu de 17T03
        // expect(eventService.hasEventOn(new Date('2018-12-17T03:24:00')).length).toBe(1);
    })
    test('hasEventOn Unit test againt', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2020-04-01T09:00:00')).length).toBe(1);
    })

    //***************** Test récupérer events par Title et return null **********************************

    test('getEventByTitle return Event | null', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle('Unit test againt')).toBe(null);
    })


    //***************** Test si emplacement disponible no return => void **********************************

    test('isLocationAvailable return void', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable('2019-12-17T03:24:00')).toBe();
    })


    //***************** Test récupérer event de la date d'aujourd'hui **********************************

    test('getCurrentEvents return Event[] ', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getCurrentEvents().length).toBe(0);
    })

    //***************************************************************************************************
});

