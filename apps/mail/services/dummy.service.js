import { utilService } from '../../../services/util.service.js';

export const dummyMails = [
    {
        id: utilService.makeId(),
        subject: `Join us`,
        body: `Pro Tools Artist is here, opening the door for a new generation of producers, 
    beatmakers, and artists to access the DAW that musical careers are built on.
    Join our live stream with hosts Gaurav Harrish from Avid and audio engineer Wavy Wayne—alongside 
    ASCAP award-winning songwriter and artist`,
        isRead: false,
        isStared: false,
        sentAt: new Date('1/1/1999'),
        to: 'user@appdonkey.com',
        from: 'johanna.h@email.com',
        senderFullname: 'johanna johan'
    },
    {
        id: utilService.makeId(),
        subject: 'All those moments',
        body: `All those moments will be lost in time, like tears in rain.
    I've known adventures,
    seen places you people will never see, I've been Offworld and back… frontiers!
    I've stood on the back deck of a blinker bound for the Plutition Camps with sweat in my eyes watching stars fight on the shoulder of
    Orion... I’ve felt wind in my hair, riding test boats off the black galaxies and seen an attack fleet burn like a match and disappear. 
    I've seen it, felt it`,
        isRead: false,
        isStared: false,
        sentAt: new Date('1/1/2020'),
        to: 'user@appdonkey.com',
        from: 'Roy_Batty@email.com',
        senderFullname: 'Rutger Hauer'
    },
    {
        id: utilService.makeId(),
        subject: `Ready to get going? So are we`,
        body: `Let's take a trip together
    Uber makes it easy to tackle your errands or commute to the office. Wherever you're going, we'll take you there.`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`1/1/2016`),
        to: `user@appdonkey.com`,
        from: `uber@uber.com`,
        senderFullname: `Uber`
    },
    {
        id: utilService.makeId(),
        subject: 'Join use!',
        body: `Adherents of every religion are bound together by creeds and codes.

    These creeds state their aspirations, their duties, their mores and their beliefs. They align the religion’s purposes and reinforce the basic tenets of the religion.
    
    The codes and creeds of Scientology were written by L. Ron Hubbard in the 1950s during the formative years of the religion. They set the guidelines for the practice and expansion of Scientology and still serve those ends today.
    
    Included in these creeds are codes for the auditor, the supervisor, the manager and additional codes by which all Scientologists strive to live. Like Scientology, the usefulness of these principles determines their worth. Scientologists follow these precepts in applying Scientology Technology, in dealings with others and in the administration of their groups and the practice of their religion.`,
        isRead: false,
        isStared: false,
        sentAt: new Date('9/30/2021'),
        to: 'user@appdonkey.com',
        from: 'MediaRelations@ChurchofScientology.net',
        senderFullname: 'Robert Adams'
    },
    {
        id: utilService.makeId(),
        subject: 'What Is QAnon?',
        body: 'Explaining the “big tent conspiracy theory” that falsely claims that former President Trump is facing down a shadowy cabal of Democratic pedophiles.',
        isRead: false,
        isStared: false,
        sentAt: new Date('1/1/2010'),
        to: 'user@appdonkey.com',
        from: 'nytimes@nytimes.net',
        senderFullname: 'The New York Times'
    },
    {
        id: utilService.makeId(),
        subject: 'The bat',
        body: `Because we have to chase him. Because he's the hero Gotham deserves, but not the one it needs right now. So we'll hunt him. Because he can take it. Because he's not our hero. He's a silent guardian, a watchful protector. A dark knight.`,
        isRead: false,
        isStared: false,
        sentAt: new Date('8/9/2008'),
        to: 'user@appdonkey.com',
        from: 'gothem.police@hotmail.com',
        senderFullname: 'Lt. James Gordon'
    },
    {
        id: utilService.makeId(),
        subject: `Ya wanna know how I got these scars?`,
        body: `My father; was a drinker; and a fiend. And one night, he goes off craazier than usual. Mommy grabs the kitchen knife to defend herself. He doesn't like that. Not. One. Bit. So, me watching, he takes the knife to her, laughing while he does it. He turns to me and say, "Why so Serious?". He comes at me with the knife. "Why so serious?". Sticks the blade in my mouth. "Let's put a smile on that face!". Aaaaaand. (Turns to hostage behind victim) "Why so serious?" (cuts victim's mouth)`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`10/6/2006`),
        to: `user@appdonkey.com`,
        from: `crazy@email.com`,
        senderFullname: `Heath Ledger`
    },
    {
        id: utilService.makeId(),
        subject: `Where's the code?????`,
        body: `You were suppose to upload the Github page two hours ago, Yaron is going to kill you tomorrow!`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`4/30/2022`),
        to: `user@appdonkey.com`,
        from: `Idan_Gez@email.com`,
        senderFullname: `Idan Gez`
    },
    {
        id: utilService.makeId(),
        subject: `Sorry I'm taken`,
        body: `I don't know who you are. I don't know what you want. If you are looking for ransom I can tell you I don't have money, but what I do have are a very particular set of skills. Skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you let my daughter go now that'll be the end of it. I will not look for you, I will not pursue you, but if you don't, I will look for you, I will find you and I will kill you.`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`4/30/2022`),
        to: `user@appdonkey.com`,
        from: `big.star@hollywood.com`,
        senderFullname: `Liam Neeson`
    },
    {
        id: utilService.makeId(),
        subject: `You've been hacked`,
        body: `You shouldn't have played with fire, now we are after you`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`4/30/2022`),
        to: `user@appdonkey.com`,
        from: `poki.bo@gmail.com`,
        senderFullname: `Poki`
    },
    {
        id: utilService.makeId(),
        subject: `Introducing Shapes!`,
        body: `Earlier this year, we launched Flows to make building user flows easier. You told us you love the snap connectors and locked screens. This month, we made Flows even better! Now, you have the ability to show conditional flows, alternate branches, and actions in Zeplin. Read more about our April product updates, including: Shapes.`,
        isRead: false,
        isStared: false,
        sentAt: new Date('5/2/22022'),
        to: 'user@appdonkey.com',
        from: 'no-reply@email.zeplin.io',
        senderFullname: 'Zeplin Crew'
    },
    {
        id: utilService.makeId(),
        subject: 'Activity in Shared Folders',
        body: `Follow specific folders and get focused updates
        Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow`,
        isRead: false,
        isStared: false,
        sentAt: new Date('7/2/2020'),
        to: 'user@appdonkey.com',
        from: 'no-reply@dropbox.com',
        senderFullname: 'Dropbox '
    },
    {
        id: utilService.makeId(),
        subject: `Lorem Ipsum`,
        body: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search `,
        isRead: false,
        isStared: false,
        sentAt: new Date(`1/1/2016`),
        to: `user@appdonkey.com`,
        from: `uber@uber.com`,
        senderFullname: `Uber`
    },
    {
        id: utilService.makeId(),
        subject: 'Where does it come from?',
        body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
        isRead: false,
        isStared: false,
        sentAt: new Date('9/30/2021'),
        to: 'user@appdonkey.com',
        from: 'MediaRelations@ChurchofScientology.net',
        senderFullname: 'Robert Adams'
    },
    {
        id: utilService.makeId(),
        subject: 'Neque porro',
        body: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
        There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...`,
        isRead: false,
        isStared: false,
        sentAt: new Date('1/1/2010'),
        to: 'user@appdonkey.com',
        from: 'Lorem@mail.com',
        senderFullname: 'Lorem'
    },
    {
        id: utilService.makeId(),
        subject: 'Netflix',
        body: `Netflix, Inc. is an American subscription streaming service and production company. Launched on August 29, 1997, it offers a film and television series library through distribution deals as well as its own productions, known as Netflix Originals.`,
        isRead: false,
        isStared: false,
        sentAt: new Date('8/9/2018'),
        to: 'user@appdonkey.com',
        from: 'Netflix@Netflix.net',
        senderFullname: 'Netflix'
    },
    {
        id: utilService.makeId(),
        subject: `Check this out!`,
        body: `https://www.youtube.com/watch?v=ZZ5LpwO-An4&t=5s`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`10/6/2006`),
        to: `user@appdonkey.com`,
        from: `crazy@email.com`,
        senderFullname: `Heath Ledger`
    },
    {
        id: utilService.makeId(),
        subject: `that's all folks`,
        body: `For me giving up is way harder than trying. - Kanye West`,
        isRead: false,
        isStared: false,
        sentAt: new Date(`2/30/2022`),
        to: `user@appdonkey.com`,
        from: `jojo@gmail.com`,
        senderFullname: `Joseph Joestar`
    },
]