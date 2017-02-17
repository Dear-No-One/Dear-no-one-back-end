function reformMember (member) {
    const reformatted = [];
    const memberById = {};
    member.forEach(member => {
        if(memberById[member.memberId]){
            memberById[member.memberId].blogs.push({
                postId:member.postId,
                postTitle:member.title,
                postBody:member.body
            });
    }
        else {
        memberById[member.memberId] = {
            id: member.memberId,
            username: member.username,
            email: member.email,
            password: member.password,
            bio: member.bio,
            template: member.template,
            theme: member.theme,
            profilePic: member.profilePic,
            blogPic: member.blogPic,
            facebook: member.facebook,
            twitter: member.twitter,
            instagram: member.instagram,
            blogs: [{
                postId:member.postId,
                postTitle:member.title,
                postBody:member.body
            }]
        };
        reformatted.push(memberById[member.memberId]);
        }
    });
    return reformatted;
}


module.exports = {
    reformMember
};
