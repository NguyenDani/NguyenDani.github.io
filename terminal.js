$(document).ready(function() {
    const greetingArt = `
    ██████╗  █████╗ ███╗   ██╗██╗███████╗██╗         ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
    ██╔══██╗██╔══██╗████╗  ██║██║██╔════╝██║         ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
    ██║  ██║███████║██╔██╗ ██║██║█████╗  ██║         ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
    ██║  ██║██╔══██║██║╚██╗██║██║██╔══╝  ██║         ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
    ██████╔╝██║  ██║██║ ╚████║██║███████╗███████╗    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
    
     ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
    ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
    ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝ 
    ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝  
    ╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║   
     ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝   
                                                                                                           
    `

    const aboutMe = `
    Welcome to my portfolio website! I'm Daniel Nguyen, a passionate and versatile software 
    engineer and cybersecurity practitioner with a strong background in computer science and 
    intelligence analysis. I hold a Bachelor's degree in Computer Science with a Minor in 
    Mathematics from the University of Houston, and an Intelligence Analyst Diploma from the 
    United States Army Intelligence Center of Excellence. This unique blend of technical 
    expertise and analytical skills enables me to approach problems from multiple perspectives.

    I am proficient in a wide range of programming languages, including C++, Java, Python, 
    Bash, PowerShell, Batch, JavaScript, HTML, CSS, SQL, NoSQL, TypeScript, C, Assembly (x86/ARM), 
    Ruby, and C#. Additionally, I have hands-on experience with various operating systems 
    such as Windows, Linux, and Unix. My professional journey includes a Programmer Analyst 
    Internship at CenterPoint Energy, where I automated critical security tasks, managed user 
    permissions, and configured secure workstations. As an Intelligence Analyst with the Texas 
    Army National Guard, I conducted comprehensive data analysis to identify security threats 
    and provided actionable intelligence to senior leadership.
    
    With my strong technical skills, analytical mindset, and dedication to excellence, I am 
    eager to take on new challenges and contribute to impactful projects. Feel free to explore 
    my portfolio and get in touch if you have any questions or opportunities for collaboration.
    `

    const projects = `
    Currently there are no project specificly in Cybersecurity.
    `

    const contact = `
    Please feel free to reach out to me using the email provided or through any of the alternative methods provided.

    Email:
    nguyendaniel1997@gmail.com
    
    Github:
    https://github.com/NguyenDani
    
    LinkedIn:
    https://linkedin.com/in/nguyen-dani/
    `
    $('#open-terminal').click(function() {
        $('#main-content').hide();
        $('#main-nav').hide();
        $('#terminal').show();

        $('#terminal').terminal(function(command, term) {
            if (command.toLowerCase() === 'help') {
                term.echo('Available commands: help, about, projects, contact, quit');
            } else if (command.toLowerCase() === 'about') {
                term.echo(aboutMe);
            } else if (command.toLowerCase() === 'projects') {
                term.echo(projects);
            } else if (command.toLowerCase() === 'contact') {
                term.echo(contact);
            } else if (command.toLowerCase() === 'quit') {
                $('#terminal').hide();
                $('#main-content').show();
                $('#main-nav').show();
            } else {
                term.echo('Unknown command: ' + command);
            }
        }, {
            greetings: greetingArt + '\nWelcome to my interactive portfolio terminal!\nType "help" to see available commands.',
            name: 'portfolio_terminal',
            height: '100%',
            prompt: 'guest@nguyendani.github.io:~$ '
        });
    });
});
